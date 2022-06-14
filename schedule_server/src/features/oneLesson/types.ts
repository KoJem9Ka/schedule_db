export type TSubject = {
  id: number
  name: string
  course: number
  semester: number
  faculty: string
  specialization: string
}

export type TCabinet = {
  id_cabinet: number
  building: string
  floor: number
  number: number
  suffix?: string
}
