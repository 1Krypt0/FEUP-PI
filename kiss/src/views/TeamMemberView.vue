<template>
  <div v-if="loading">
    <div class="flex justify-center items-center m-auto">
      <div class="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status"
        style="border-top-color: transparent;">
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex flex-col md:flex-row items-center md:items-start py-10 md:py-14">
      <div class="md:w-2/6 flex flex-col items-center pb-20 md:pb-0">
        <img v-if="imageShowUrl" :src="imageShowUrl" class="h-[300px] w-[234px] rounded-2xl" alt="Profile Picture">
        <img v-else src="../assets/profile.png" class="h-[300px] w-[234px] rounded-2xl" alt="Profile Picture">
        <div class="md:w-2/4 pl-2 flex flex-col items-center md:block">
          <h2 class="accent-fg text-4xl font-bold pt-14">Areas of Interest</h2>
          <div class="flex-col items-start w-auto pl-8">
            <ul
              class="pt-5 text-black text-xl md:list-disc flex flex-col items-center md:items-start md:block space-y-3">
              <li v-for="interest in interests" :key="interest">{{ interest }}</li>
            </ul>
          </div>
          <h2 class="accent-fg text-4xl font-bold pt-14">Relevant links</h2>
          <div class="flex-col items-start w-auto pl-2">
            <ul class="pt-5 text-black text-xl break-words flex flex-col items-center md:block space-y-6">
              <li v-if="member?.email">E-mail: <a :href="'mailto:' + member?.email">{{ member?.email }}</a> </li>
              <li v-if="member?.personalPageLink">Personal Page: <a :href="member?.personalPageLink">{{
                  member?.personalPageLink
              }}</a> </li>
              <li v-if="member?.sigarraNumber">SIGARRA Number: <a
                  :href="'https://sigarra.up.pt/feup/pt/func_geral.formview?p_codigo=' + member?.sigarraNumber">{{
                      member?.sigarraNumber
                  }}</a></li>
              <li v-if="member?.orcid">ORCID: <a :href="'httos://www.orcid.org/' + member?.orcid">{{
                  member?.orcid
              }}</a> </li>
              <li v-if="member?.authenticus">Authenticus: <a
                  :href="'https://www.authenticus.pt/' + member?.authenticus">{{ member?.authenticus }}</a> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="md:w-3/6 mx-24 text-center md:text-left lg:pl-10 md:pr-0 lg:mx-0">
        <h2 class="accent-fg text-4xl font-bold">{{ member?.name }} - {{ member?.mainRole }}</h2>
        <Markdown class="prose-headings:accent-fg text-black text-xl py-10 prose max-w-none" :source="member?.bio" />
        <h2 v-if="thesisGroup?.length !== 0" class="accent-fg text-4xl font-bold">Supervised Publications </h2>
        <ul class="pt-5 text-black text-xl space-y-3 py-10">
          <li v-for="thesis in thesisGroup" :key="thesis.id">
            <a :href="thesis.repo">
              {{ thesis.year }}: {{ thesis.author }} - {{ thesis.title }}
            </a>
          </li>
        </ul>

        <h2 v-if="member?.additionalInfo !== ''" class="accent-fg text-4xl font-bold">Additional Info</h2>
        <Markdown class="text-black text-xl py-10 prose max-w-none prose-headings:accent-fg"
          :source="member?.additionalInfo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { retrievePageData } from '@/lib/gsheets'
import { computed, inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { TeamMember, Thesis } from '@/lib/interfaces'
import Markdown from 'vue3-markdown-it'
import { getImageLink } from '@/lib/gdrive'
import { apiKeyInjectionKey, configInjectionKey, themeInjectionKey } from '@/lib/keys'
import { setTheme } from '@/lib/themes'

const id = inject(configInjectionKey) as string
const key = inject(apiKeyInjectionKey) as string
const theme = inject<{ value: string }>(themeInjectionKey, { value: '' })

const memberId: string | string[] = useRoute().params.id

const loading = ref<boolean>()
loading.value = true

const member = ref<TeamMember>()
const thesisGroup = ref<Thesis[]>()
const imageShowUrl = ref<string>()

const interests = computed(() => {
  return member.value?.areasOfInterest.split(',')
})

function getTeamData (data: { Team: unknown[] }): unknown[] {
  return data.Team
}

function getThesisData (data: { Thesis: unknown[] }): unknown[] {
  return data.Thesis
}

async function fetchTeamAndThesis () {
  const teamSpreadsheetData: unknown = await retrievePageData('Team', id, key)
  const thesisSpreadsheetData: unknown = await retrievePageData('Thesis', id, key)
  return [teamSpreadsheetData, thesisSpreadsheetData]
}

onMounted(async () => {
  await fetchTeamAndThesis().then(
    (data) => {
      const teamSpreadsheetData = data[0]
      const thesisSpreadsheetData = data[1]
      const teamData = getTeamData(teamSpreadsheetData as { Team: unknown[] }) as TeamMember[]

      const thesisData: Thesis[] = getThesisData(thesisSpreadsheetData as { Thesis: unknown[] }) as Thesis[]

      member.value = teamData.find((teamMember) => {
        return teamMember.id === memberId
      })

      if (member.value?.photo) {
        imageShowUrl.value = getImageLink(member.value.photo)
      }

      thesisGroup.value = thesisData.filter((thesis) => {
        const supervisors: string[] = thesis.supervisors.split(', ')
        return supervisors.includes(member.value?.name || '')
      })

      loading.value = false
    }
  ).then(
    () => {
      setTheme(theme.value)
    }
  )
})
</script>

<style scoped>
a {
  color: #111827;
  text-decoration: underline;
  font-weight: 500;
}
</style>
