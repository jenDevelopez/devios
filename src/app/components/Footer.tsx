import { BiCopyright} from 'react-icons/bi'
import {TbWorld} from 'react-icons/tb'

export default function Footer() {
  
  return (
    <footer>
      <p>
        <BiCopyright /> {year} Devios. All rights reserved.
      </p>
      <div>
        <TbWorld />
        <span>España</span>
      </div>
    </footer>
  )
}
