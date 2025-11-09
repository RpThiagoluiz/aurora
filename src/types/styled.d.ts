import 'styled-components'
import { Colors } from '../types'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
  }
}