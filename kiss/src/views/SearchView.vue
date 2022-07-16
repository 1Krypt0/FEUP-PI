<template>
  <div class="flex flex-col items-center">
    <div class="pt-24 w-3/5 space-y-4">
      <input v-model="input" class="w-full py-4 rounded-xl border-2 accent-fg px-6" placeholder="Search Here"
        @keyup="handleSearch" id="search-input" />
    </div>
    <div class="py-16 w-3/5 ">
      <div v-if="input !== ''" class="">
        <h1 class="accent-fg text-3xl font-semibold">People</h1>
        <hr />
        <div v-for="member in topThreeTeamSearches" :key="member.name" class="py-10 w-full">
          <div class="flex">
            <router-link :to="{ name: 'team-member', params: { id: member.id } }">
              <img v-if="member.photo" :src="getImageLink(member.photo)" class="h-[200px] w-[156px] rounded-sm"
                alt="Profile Picture">
              <img v-else src="../assets/profile.png" class="h-[200px] w-[156px]" alt="Profile Picture">
            </router-link>
            <div class="px-10 py-3 w-full">
              <router-link :to="{ name: 'team-member', params: { id: member.id } }">
                <h3 class="text-lg text-black font-bold pb-8"> {{ member.name }} </h3>
                <p class="">{{ member.shortBio }}</p>
              </router-link>
            </div>
          </div>
        </div>
        <h1 class="accent-fg text-3xl font-semibold py-4">Projects</h1>
        <hr />
        <div v-for="project in topThreeProjectSearches" :key="project.name" class="py-10 ">
          <div class="flex">
            <router-link :to="{ name: 'project', params: { id: project.id } }">
              <img v-if="project.imageShareLink" :src="getImageLink(project.imageShareLink)"
                class="h-[200px] w-[156px] rounded-sm" alt="Profile Picture">
              <img v-else src="../assets/FourEyesPhoto.png" class="h-[200px] w-[156px]" alt="Profile Picture">
            </router-link>
            <div class="px-10 py-3">
              <router-link :to="{ name: 'project', params: { id: project.id } }">
                <h3 class="text-lg text-black font-bold pb-8"> {{ project.name }} </h3>
                <p class="">{{ project.shortDescription }}</p>
              </router-link>
            </div>
          </div>
        </div>
        <h1 class="accent-fg text-3xl font-semibold">News</h1>
        <hr />
        <div v-for="news in topThreeNewsSearches" :key="news.title" class="py-10 ">
          <div class="flex">
            <router-link :to="{ name: 'new', params: { id: news.id } }">
              <img
                v-if="news?.thumbnail && !(getImageLink(news.thumbnail) === 'https://drive.google.com/uc?export=view&id=https:')"
                :src="getImageLink(news.thumbnail)" class=" object-cover h-[200px] w-[156px] rounded-2xl"
                alt="News Picture">
              <img
                v-else-if="news?.thumbnail && (getImageLink(news.thumbnail) === 'https://drive.google.com/uc?export=view&id=https:')"
                :src="news.thumbnail" class="object-fill h-[200px] w-[156px] rounded-2xl" alt="News Picture">
              <img v-else src="../assets/newspaper.png" class="h-[200px] w-[156px]" alt="Profile Picture">
            </router-link>
            <div class="px-10 py-3">
              <router-link :to="{ name: 'new', params: { id: news.id } }">
                <h3 class="text-lg text-black font-bold pb-8"> {{ news.title }} </h3>
                <Markdown class="prose prose-headings:text-black" :source="news.shortText" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { retrievePageData } from '@/lib/gsheets'
import Markdown from 'vue3-markdown-it'
import { inject, onMounted, reactive, ref } from 'vue'
import { apiKeyInjectionKey, configInjectionKey, themeInjectionKey } from '@/lib/keys'
import fuzzysort from 'fuzzysort'
import { computed } from '@vue/reactivity'
import { getImageLink } from '@/lib/gdrive'
import { setTheme } from '@/lib/themes'

const id = inject(configInjectionKey) as string
const key = inject(apiKeyInjectionKey) as string
const theme = inject<{ value: string }>(themeInjectionKey, { value: '' })

const input = ref<string>('')

const loading = ref<boolean>()
loading.value = true

const teamSearchResult = ref<{ name: string, shortBio: string, photo: string, id: number }[]>()
const projectSearchResult = ref<{ name: string, shortDescription: string, imageShareLink: string, id: number }[]>()
const newsSearchResult = ref<{ title: string, shortText: string, thumbnail: string, id: number }[]>()

// When showing more or less results per category,
// alter the values inside the following slices
const topThreeTeamSearches = computed(() => {
  return teamSearchResult.value?.slice(0, 3)
})

const topThreeProjectSearches = computed(() => {
  return projectSearchResult.value?.slice(0, 3)
})

const topThreeNewsSearches = computed(() => {
  return newsSearchResult.value?.slice(0, 3)
})

const data = reactive({
  Team: [{ name: '', shortBio: '', photo: '', id: 0 }], Projects: [{ name: '', shortDescription: '', imageShareLink: '', id: 0 }], News: [{ title: '', shortText: '', thumbnail: '', id: 0 }]
})

function getTeamData (data: { Team: unknown[] }): unknown[] {
  return data.Team
}

function getProjectData (data: { Projects: unknown[] }): unknown[] {
  return data.Projects
}

function getNewsData (data: { News: unknown[] }): unknown[] {
  return data.News
}

/**
 * Handles all the searching related features using data from the spreadsheet
 * Must run individual searches per category, but it is still very efficient
 */
function handleSearch () {
  teamSearchResult.value = []
  projectSearchResult.value = []
  newsSearchResult.value = []

  fuzzysort.go(input.value.toLowerCase(), data.Team, { keys: ['name', 'shortBio'] }).forEach((result) => {
    teamSearchResult.value?.push(result.obj)
  })

  fuzzysort.go(input.value.toLowerCase(), data.Projects, { keys: ['name', 'shortDescription'] }).forEach((result) => {
    projectSearchResult.value?.push(result.obj)
  })

  fuzzysort.go(input.value.toLowerCase(), data.News, { keys: ['title', 'shortText'] }).forEach((result) => {
    newsSearchResult.value?.push(result.obj)
  })
}

async function fetchItems () {
  const teamData: unknown = await retrievePageData('Team', id, key)
  const projectData: unknown = await retrievePageData('Projects', id, key)
  const newsData: unknown = await retrievePageData('News', id, key)
  return [teamData, projectData, newsData]
}

onMounted(async () => {
  await fetchItems().then(
    (spreadsData) => {
      const teamData = spreadsData[0]
      const projectData = spreadsData[1]
      const newsData = spreadsData[2]
      data.Team = getTeamData(teamData as { Team: unknown[] }) as { name: string, shortBio: string, photo: string, id: number }[]
      data.Projects = getProjectData(projectData as { Projects: unknown[] }) as { name: string, shortDescription: string, imageShareLink: string, id: number }[]
      data.News = getNewsData(newsData as { News: unknown[] }) as { title: string, shortText: string, thumbnail: string, id: number }[]
    }
  ).then(
    () => {
      setTheme(theme.value)
    }
  ).then(
    () => {
      loading.value = false
    }
  )
})
</script>
