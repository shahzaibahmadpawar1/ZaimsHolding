import { permanentRedirect } from "next/navigation";

export default function StakeholdersRedirect() {
  permanentRedirect("/investors");
}
