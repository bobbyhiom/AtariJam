@Component("slerpData")
export class SlerpData {
  originRot: Quaternion = Quaternion.Euler(0, 90, 0)
  targetRot: Quaternion = Quaternion.Euler(0, 0, 0)
  fraction: number = 0
  speed: number = 1
}