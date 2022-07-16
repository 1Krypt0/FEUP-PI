<template class="bg-white">
  <!-- Necessary to allow for colorscheme changes with Tailwind -->
  <div
    class="text-accent_engineering bg-accent_engineering border-b-accent_engineering text-accent_blue bg-accent_blue border-b-accent_blue text-accent_green bg-accent_green border-b-accent_green text-accent_purple bg-accent_purple border-b-accent_purple">
  </div>
  <div v-if="loading">
    <div class="flex justify-center items-center m-auto">
      <div class="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status"
        style="border-top-color: transparent;">
      </div>
    </div>
  </div>
  <div v-else>
    <nav class="container px-6 lg:px-28 py-8 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <router-link to="/">
          <img src="./assets/GIG_logo.png" alt="GIG Logo" class="w-[65px] md:w-[90px] lg:w-[100px]">
        </router-link>
        <div @click="showMenu = !showMenu" class="flex md:hidden">
          <button type="button" class="text-black">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
              </path>
            </svg>
          </button>
        </div>
      </div>
      <ul :class="showMenu ? 'flex' : 'hidden'"
        class="flex-col items-end mt-8 right-8 absolute space-y-3 md:flex md:gap-12 lg:gap-16 md:static md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
        <li class="text-black font-medium text-base" @click="toggleNav">
          <router-link to="/about">
            About
          </router-link>
        </li>
        <li class="text-black font-medium text-base" @click="toggleNav">
          <router-link to="/projects">
            Projects
          </router-link>
        </li>
        <li class="text-black font-medium text-base" @click="toggleNav">
          <router-link to="/team">
            Team
          </router-link>
        </li>
        <li class="text-black font-medium text-base" @click="toggleNav">
          <router-link to="/news">
            News
          </router-link>
        </li>
        <li>
          <router-link to="/search">
            <font-awesome-icon icon="magnifying-glass" />
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body {
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}
</style>

<script setup lang="ts">
import { onBeforeMount, provide, ref } from 'vue'
import { retrievePageData } from './lib/gsheets'
import { apiKeyInjectionKey, configInjectionKey, themeInjectionKey } from './lib/keys'
import settings from './lib/settings'

// Controls spinner wheel status
const loading = ref<boolean>()
loading.value = true

// For now only providing the spreasheetID as it is the only config found.
// In the future, switch to provide the entire file, and change the types as
// needed
provide(configInjectionKey, settings.spreadsheetID)
provide(apiKeyInjectionKey, settings.apiKey)

// Add default value so it starts closed
const showMenu = ref(false)
const toggleNav = () => (showMenu.value = !showMenu.value)

// Make theme available globally so it can be applied to any page
const theme = ref<string>()
provide(themeInjectionKey, theme)

onBeforeMount(async () => {
  const configSpreadsheetData = await retrievePageData('Config', settings.configID, settings.apiKey)
  theme.value = (configSpreadsheetData.Config as { theme: string }[])[0].theme
  loading.value = false
})
</script>
