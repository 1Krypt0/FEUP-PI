<template>
  <div v-if="loading">
    <div class="flex justify-center items-center m-auto">
      <div class="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status"
        style="border-top-color: transparent;">
      </div>
    </div>
  </div>
  <div v-else>
    <div class="flex flex-col items-center pt-14 text-center">
      <h1 class="accent-fg text-6xl font-extrabold">
        {{ project?.name }}
      </h1>
      <img v-if="project?.imageShareLink" :src="imageShowUrl"
        class="lg:h-[200px] md:h-[150px] md:w-[117px] lg:w-[156px]" alt="Project Picture">
      <img v-else src="../assets/FourEyesPhoto.png" class="lg:h-[200px] md:h-[150px] md:w-[117px] lg:w-[156px]"
        alt="Project Picture">
      <p class="accent-fg text-2xl py-4"> {{ project?.longName }} </p>
      <p class="accent-fg py-16 text-xl px-10 md:w-3/4 lg:w-2/4 text-center"> {{ project?.shortDescription }} </p>
    </div>
    <div class="flex flex-col md:flex-row md:px-10 lg:px-52 py-10">
      <div class="md:w-4/6 py-8 md:py-0 flex flex-col md:block items-center">
        <div class="flex px-12">
          <h4 class="accent-b accent-fg text-2xl font-bold w-2/4 border-b-2">Description</h4>
        </div>
        <Markdown
          class="prose-headings:accent-fg text-center md:text-left text-black text-xl px-12 pt-6 prose max-w-none"
          :source="project?.description" />
      </div>
      <div class="md:w-2/6 flex flex-col items-center md:block">
        <h4 class="accent-b accent-fg text-2xl font-bold border-b-2">Main information</h4>
        <ul class="pt-6 text-lg flex flex-col items-center md:block">
          <li v-if="project?.startYear" class="flex py-4 break-words">
            <p class="accent-fg">Duration:</p>
            <p class="pl-4 text-black"> {{ project?.startYear }} - {{ project?.endYear }} </p>
          </li>
          <li v-if="project?.tags" class="flex py-4 break-words">
            <p class="text-accent ">Tags:</p>
            <p class="pl-4 text-black "> {{ project?.tags }}</p>
          </li>
          <li v-if="project?.site" class="flex py-4 ">
            <p class="accent-fg ">Site:</p>
            <p class="pl-4 text-black break-all"> <a :href="project?.site">{{ project?.site }}</a></p>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col items-center py-10">
      <h1 v-if="peopleInvolved && peopleInvolved?.length !== 0" class="text-4xl font-bold accent-fg">People Involved
      </h1>
      <div class="flex flex-col md:grid md:grid-cols-3 pt-20 w-4/5 gap-20">
        <TeamMemberDescription v-for="person in peopleInvolved" :name="person.name" :id="person.id" :short-bio="''"
          :photo="person.photo" :key="person.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Project, TeamMember } from '@/lib/interfaces'
import { inject, onMounted, ref } from 'vue'
import { retrievePageData } from '@/lib/gsheets'
import Markdown from 'vue3-markdown-it'
import TeamMemberDescription from '@/components/TeamMemberDescription.vue'
import { getImageLink } from '@/lib/gdrive'
import { apiKeyInjectionKey, configInjectionKey, themeInjectionKey } from '@/lib/keys'
import { setTheme } from '@/lib/themes'

const id = inject(configInjectionKey) as string
const key = inject(apiKeyInjectionKey) as string
const theme = inject<{ value: string }>(themeInjectionKey, { value: '' })

const projectID: string | string[] = useRoute().params.id
const project = ref<Project>()
const imageShowUrl = ref<string>()
const peopleInvolved = ref<{ id: number, name: string, photo: string }[]>()
const loading = ref<boolean>()
loading.value = true

function getProjectData (data: { Projects: unknown[] }): unknown[] {
  return data.Projects
}

function getTeamData (data: { Team: unknown[] }): unknown[] {
  return data.Team
}

async function fetchProjectsAndTeams () {
  const projectsSpreadsheetData: unknown = await retrievePageData('Projects', id, key)
  const teamSpreadsheetData: unknown = await retrievePageData('Team', id, key)

  return [projectsSpreadsheetData, teamSpreadsheetData]
}

onMounted(async () => {
  await fetchProjectsAndTeams().then(
    (data) => {
      const projectsSpreadsheetData = data[0]
      const teamSpreadsheetData = data[1]

      const projectsData: Project[] = getProjectData(projectsSpreadsheetData as { Projects: unknown[] }) as Project[]

      project.value = projectsData.find((project) => {
        return project.id === projectID
      })

      if (project.value && project.value.imageShareLink) {
        imageShowUrl.value = getImageLink(project.value.imageShareLink)
      }

      const namesOfPeopleInvolved = project.value?.peopleInvolved.split(/,\s*/) || []

      const teamData: TeamMember[] = getTeamData(teamSpreadsheetData as { Team: unknown[] }) as TeamMember[]

      const people: { id: number, name: string, photo: string }[] = []
      teamData.forEach((member) => {
        if (namesOfPeopleInvolved.find((name) => { return name === member.name })) {
          people.push({ id: parseInt(member.id), name: member.name, photo: member.photo })
        }
      })
      peopleInvolved.value = people
      loading.value = false
    }
  ).then(() => {
    setTheme(theme.value)
  })
})

</script>

<style scoped>
@media (min-width: 768px) {
  #description {
    border-bottom: 2px solid #8c2d19;
  }
}

a {
  color: #111827;
  text-decoration: underline;
  font-weight: 500;
}
</style>
