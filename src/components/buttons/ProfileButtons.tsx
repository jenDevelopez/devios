import { Button } from "@/interfaces/types";
import { useDeviosStore } from "@/app/store/deviosStore";
import { profileButtons } from "@/data/botones";



export default function ProfileButtons() {

  return (
    <div>
      <ActiveButtons buttons={profileButtons} />
    </div>
  );
  
}

function ActiveButtons({buttons}:{buttons:Button[]}) {
  const {setActiveComponent} = useDeviosStore();
  const renderComponent = (component: React.FC) => {
    setActiveComponent(component);
  }

  return (
    <div className="w-full flex justify-around py-4 px-2">
      {buttons.map((button) => (
        <button
          className="px-2 py-1 border"
          key={button.id}
          type="button"
          onClick={() => renderComponent(button.component)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}