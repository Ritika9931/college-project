import moment from 'moment'
import lodash from 'lodash'
import evaluate from 'safe-evaluate-expression'
export default (router, { services, exceptions, logger }) => {
  const { ItemsService, RolesService } = services

  router.get('/', (req, res) => res.send('Hello, World!'));
  router.get('/salary_sheet', async function (req, res) {

    let monthYear = req?.query?.month
    if (!monthYear) {
      return
    }
    let year = moment(monthYear).format('YYYY')
    let month = moment(monthYear).format('MM')
    let currentDate = moment()
    let totalDays = parseInt(moment(monthYear).endOf('month').format('D'))
    const partyService = new ItemsService('employees', { schema: req.schema, accountability: { admin: true } });
    let employees = await partyService.readByQuery({ fields: ['id', 'name', 'salaries.*'], limit: -1 })

    const salaryComponentService = new ItemsService('salary_components', { schema: req.schema, accountability: { admin: true } });
    let salaryComponents = await salaryComponentService.readByQuery({})

    const salaryStructureTemplatesService = new ItemsService('salary_structure_templates', { schema: req.schema, accountability: { admin: true } });
    let salaryStructureTemplates = await salaryStructureTemplatesService.readByQuery({ fields: ['*', 'details.*', 'details.salary_component_id.*'] })
    console.log(salaryStructureTemplates)
    let defaultSalaryStructure = salaryStructureTemplates[0]

    const attendenceService = new ItemsService('attendences', { schema: req.schema, accountability: { admin: true } });


    let salarySheetPromises = employees.map(async e => {
      let employeeSalary = {}
      employeeSalary.name = e.name + '(' + (e?.salaries?.[0]?.basic_salary || 0) + ')'
      let filter = {
        _and: [
          { timestamp: { _gte: moment(monthYear).startOf('month').format('YYYY-MM-DD HH:mm:ss') } },
          { timestamp: { _lt: moment(monthYear).endOf('month').format('YYYY-MM-DD HH:mm:ss') } },
          { employee_id: e.id }
        ]
      }

      employeeSalary.attendences = await attendenceService.readByQuery({ filter, limit: -1 })

      employeeSalary.present_days = 0
      employeeSalary.total_leave = 0
      employeeSalary.total_absent = 0
      employeeSalary.sundays = 0
      for (let day = 1; day <= totalDays; day++) {
        let dayDate = moment({ day: day, month: month - 1, year })
        if (dayDate.diff(currentDate, 'days') > 0) {
          continue
        }
        // let iterationDate = date.buildDate({ date: day })
        let _in = employeeSalary.attendences.find(log => {
          let logDate = log.timestamp
          let logDay = parseInt(moment(logDate).format('D'))
          return day === logDay && log.employee_id === e.id && log.log_type === 'log_in'
        })
        let out = employeeSalary.attendences.find(log => {
          let logDate = log.timestamp
          let logDay = parseInt(moment(logDate).format('D'))
          return day === logDay && log.employee_id === e.id && log.log_type === 'log_out'
        })
        let status = ''
        let sunday = false
        let leave = false
        if (_in || out) {
          status = 'P'
          employeeSalary.present_days++
        } else {
          if (dayDate.format('E') == 7) {

            status = 'S'
            sunday = true
            employeeSalary.sundays++
          } else {
            status = 'A'
            employeeSalary.total_absent++
            // employeeSalary.present_days++
          }
          //             leave = this.leaves.find(l => {
          //               if (l.employee_id !== employee.id) {
          //                 return false
          //               }
          //               let from = new Date(l.date_from)
          //               let to = new Date(l.date_to)
          //               const unit = 'days'
          //               const valid = date.getDateDiff(dayDate, from, unit) >= 0 && date.getDateDiff(to, dayDate, unit) >= 0

          //               return l.employee_id === employee.id && valid
          //             })
          //             if (leave) {

          //               status = 'L'
          //               total_leave++
          //               total_absent--
          //             }

        }
        // row['day' + day] = { in: _in, out, status, sunday, leave }
      }


      defaultSalaryStructure.details.forEach(d => {
        employeeSalary[d.salary_component_id.short_code] = ''
      })
      defaultSalaryStructure.details.forEach(d => {
        let value = ''
        if (d.salary_component_id.short_code === 'BS') {
          value = 10000
        }
        if (d.formula) {

          // logger.info(d.salary_component_id.short_code, evaluate(d.formula, { ...employeeSalary, self: d.salary_component_id, emp: e }))
          employeeSalary[d.salary_component_id.short_code] = parseFloat(parseFloat(evaluate(d.formula, { ...employeeSalary, self: d.salary_component_id, emp: e, totalDays, presentDays: employeeSalary.present_days })).toFixed(2))
        } else {
          employeeSalary[d.salary_component_id.short_code] = value
        }

      })
      employeeSalary.total = defaultSalaryStructure.details.reduce((prev, cur) => {
        if (cur.salary_component_id.type === 'unaffected') {
          return prev
        }
        let value = employeeSalary[cur.salary_component_id.short_code]
        if (cur.salary_component_id.type === 'deduction') {
          value = 0 - value
        }
        prev = prev + value
        return prev
      }, 0)
      employeeSalary.total = Math.round(employeeSalary.total)
      delete employeeSalary.attendences
      return employeeSalary
    })
    let salary_sheet = await Promise.all(salarySheetPromises)
    res.send({ data: salary_sheet })
  })
};
