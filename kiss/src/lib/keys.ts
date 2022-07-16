/**
 * @fileoverview Contains the global provider keys used
 *    to make information available on all components.
 *    It is good practice to keep them in this file, as
 *    Vue doesn't yet scrape the component files
 */
import { InjectionKey } from 'vue'

export const configInjectionKey = Symbol('Config file key') as InjectionKey<unknown>
export const themeInjectionKey = Symbol('Theme key') as InjectionKey<unknown>
export const apiKeyInjectionKey = Symbol('API key key') as InjectionKey<unknown>
