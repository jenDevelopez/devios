import { Button } from "@/interfaces/types"
import { ProfileComponent,ShoppingComponent,HelpComponent,SettingsComponent } from "@/components/profile"
export const profileButtons:Button[] = [
  {
    id:1,
    text: 'PERFIL',
    component: ProfileComponent,
  },
  {
    id:2,
    text: 'COMPRAS',
    component: ShoppingComponent,
  },
  {
    id:3,
    text: 'AYUDA',
    component: HelpComponent,
  },
  {
    id:4,
    text: 'AJUSTES',
    component: SettingsComponent,
  }
]