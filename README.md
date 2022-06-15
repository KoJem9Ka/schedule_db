# ScheduleBook
Coursework for the subject «Databases» on the topic «The schedule of classes at the university». In every educational
institution it is necessary to organize the ongoing educational lessons, so this topic will be relevant.

## Screenshots
![](https://github.com/KoJem9Ka/schedule_db/blob/main/assets/home_page.png)
![](https://github.com/KoJem9Ka/schedule_db/blob/main/assets/lesson_edit.png)
![](https://github.com/KoJem9Ka/schedule_db/blob/main/assets/student_points.png)

The entire project is written using **TypesScript**.

Database:
- PostgreSQL

Backend:
- Node.js 
- express 
- node-postgres

Frontend:
- React.js

## Relational Schema
![](https://github.com/KoJem9Ka/schedule_db/blob/main/assets/relation_schema.png)

## Provided API:
- API Method Name
  - HTTP-METHOD ```url```
  - Body: ```type```
  - ```Response type```
- Get all lessons: 
  - GET ```.../schedule?page=number&limit=number```
  - ```typescript
    {
      count: number
      lessons: TLesson[]
    }
    ```
- Get one lesson by id
  - GET ```.../schedule/:id```
  - ```typescript
    TLesson
    ```
- Add lesson
  - POST `.../schedule`
  - Body:
    ```typescript
    {
      lesson: TDBLesson
      groupsIds: number[]
    }
    ```
  - ```typescript
    {
      success: boolean
      error?: string
      newId?: number
    }
    ```
- Update lesson
  - PUT `.../schedule`
  - Body:
    ```typescript
    {
      lesson: TDBLesson
      groupsIds: number[]
    }
    ```
  - ```typescript
    {
      success: boolean
      error?: string
    }
    ```
- Remove some lessons
  - DELETE `.../schedule`
  - Body: `number[]`
  - ```typescript
    {
      success: boolean
      error?: string
      deletedIds?: number[]
    }
    ```
- Get available groups and educators for subject by id
  - GET `.../lesson/subject_availabilities/:id_subject`
  - Returns tuples: [id, name] 
    ```typescript
    {
      groups: [ number, string ][]
      educators: [ number, string ][]
    }
    ```
- Get subjects and cabinets
  - GET `.../lesson/requirements`
  - Returns tuples: [id, name]
    ```typescript
    {
      subjects: [ number, string ][]
      cabinets: [ number, string ][]
    }
    ```
- Get specializations
  - GET `.../points/specializations`
  - Returns tuples: [id, name]
    ```
    [ number, string ][]
    ```
- Get groups by specialization id
  - GET `.../points/groups/:specialization_id`
  - Returns tuples: [id, name]
    ```
    [ number, string ][]
    ```
- Get students by group id
  - GET `.../points/students/:group_id`
  - Returns tuples: [id, name]
    ```
    [ number, string ][]
    ```
- Getting points for student subjects attendance by student id
  - GET `.../points/:student_id`
  - ```
    Array<{
      subject: string
      attendances: number
      points: string
      sum: number
      avg: number
    }>
    ```


### Reference:
```typescript
type TLesson = {
  id: number
  type: 'lab' | 'practice' | 'lecture' | 'seminar'
  groups: {
    id: number
    name: string
  }[]
  educator: string
  id_educator: number
  subject: string
  id_subject: number
  cabinet?: string
  id_cabinet?: number
  date: string
  time_start: string
  time_end: string
  url?: string
  home_work?: string
  commentary?: string
}

type TDBLesson = {
  id: number
  type: 'lab' | 'practice' | 'lecture' | 'seminar'
  id_educator: number
  id_subject: number
  id_cabinet?: number
  datetime_start: string
  datetime_end: string
  distant_url?: string
  home_work?: string
  commentary?: string
}
```
