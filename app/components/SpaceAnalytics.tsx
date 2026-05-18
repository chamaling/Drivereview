import { scanDriveAction } from "../actions/scanDriveAction"
export default function SpaceAnalytics({
  data,
}: {
  data: Awaited<ReturnType<typeof scanDriveAction>>["data"]
}) {
  return <></>
}
