<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-blue">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>

          Attendance & Payroll
        </q-toolbar-title>
        <div class="row items-center ">
          <MarkAttendance class="q-mx-md" />
          <ProfileBtn class="q-mx-md">
          </ProfileBtn>
        </div>


      </q-toolbar>
    </q-header>

    <q-drawer class="bg-green-2" v-model="leftDrawerOpen" show-if-above bordered :width="200">

      <q-list>
        <Menu v-for="item in menu" :key="item.label" v-bind="item" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>


</template>

<script>

import Menu from 'components/Menu.vue'
import menu from 'src/data/menu.js'
import ProfileBtn from 'components/modules/profile/btn.vue'
import MarkAttendance from 'components/modules/attendence/markAttendance.vue'

export default {
  name: 'MainLayout',
  data () {
    return {
      menu,
      leftDrawerOpen: false

    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  },
  components: {
    Menu, ProfileBtn, MarkAttendance
  },


}
</script>
