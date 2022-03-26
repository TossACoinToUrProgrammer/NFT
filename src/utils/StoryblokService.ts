import StoryblokClient, { StoriesParams } from 'storyblok-js-client'
import { CONFIG } from '@CONFIG'

const cv = Date.now()

class StoryblokServiceClass {
  private devMode: boolean

  private cv?: number

  private token: string

  private client: StoryblokClient

  private query: any

  constructor() {
    this.token = process.env.NODE_ENV === 'production' ? CONFIG.publicToken : CONFIG.previewToken
    this.devMode = process.env.NODE_ENV !== 'production'
    this.cv = cv
    this.client = new StoryblokClient({
      accessToken: this.token,
      cache: {
        clear: 'auto',
        type: 'memory',
      },
    })

    this.query = {}
  }

  getSearch(slug: string, params: Record<string, unknown>) {
    return this.client.get(slug, { ...params, ...this.getDefaultParams() })
  }

  getDefaultParams() {
    const params: StoriesParams = {}

    if (typeof window !== 'undefined' && typeof window.StoryblokCacheVersion !== 'undefined') {
      params.cv = window.StoryblokCacheVersion
    }

    const getFromRelease = this.getQuery('_storyblok_release')
    if (getFromRelease) {
      params.from_release = getFromRelease
    }

    if(process.env.STORYBOOK) {
      params.version = 'published'
      this.client.setToken(CONFIG.publicToken)
      this.devMode = false
    } else if (this.getQuery('_storyblok') || this.devMode || (typeof window !== 'undefined' && window.StoryblokBridge)) {
      params.version = 'draft'
      this.client.setToken(CONFIG.previewToken)
    }

    return params
  }

  async create(slug: string, params = {}) {
    return this.client.post(slug, params)
  }

  async update(slug: string, params = {}) {
    return this.client.put(slug, params)
  }

  setDevMode() {
    this.devMode = true
  }

  getQuery(param: StoryblokServiceClass['query']) {
    return this.query[param]
  }

  setQuery(params: any) {
    this.query = params
  }
}

export const StoryblokService = new StoryblokServiceClass()