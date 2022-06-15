# ScheduleBook
Coursework for the subject «Databases» on the topic «The schedule of classes at the university». In every educational
institution it is necessary to organize the ongoing educational lessons, so this topic will be relevant.

## Screenshots
![](https://github.com/KoJem9Ka/schedule_db/blob/master/assets/home_page.png)
![](https://github.com/KoJem9Ka/schedule_db/blob/master/assets/lesson_edit.png)
![](https://github.com/KoJem9Ka/schedule_db/blob/master/assets/student_points.png)

## Technology Stack
The entire project is written using **TypesScript**.

- Database:
  - PostgreSQL

- Backend:
  - Node.js 
  - express 
  - node-postgres

- Frontend:
  - React.js

## Database Relational Schema
![](https://github.com/KoJem9Ka/schedule_db/blob/main/assets/relation_schema.png)

## Provided Server REST API :
- API Method Name
  - HTTP-METHOD ```url```
  - ```typescript
    type body = {}
    type res = {}
    ```
- Get all lessons: 
  - GET ```.../schedule?page=number&limit=number```
  - ```typescript
    type res = {
      count: number
      lessons: TLesson[]
    }
    ```
- Get one lesson by id
  - GET ```.../schedule/:id```
  - ```typescript
    type res = TLesson
    ```
- Add lesson
  - POST `.../schedule`
  - ```typescript
    type body = {
      lesson: TDBLesson
      groupsIds: number[]
    }
    type res = {
      success: boolean
      error?: string
      newId?: number
    }
    ```
- Update lesson
  - PUT `.../schedule`
  - ```typescript
    type body = {
      lesson: TDBLesson
      groupsIds: number[]
    }
    type res = {
      success: boolean
      error?: string
    }
    ```
- Remove some lessons
  - DELETE `.../schedule`
  - ```typescript
    type body = number[]
    type res = {
      success: boolean
      error?: string
      deletedIds?: number[]
    }
    ```
- Get available groups and educators for subject by id
  - GET `.../lesson/subject_availabilities/:id_subject`
  - ```typescript
    //tuples: [id, name] 
    type res = {
      groups: [ number, string ][]
      educators: [ number, string ][]
    }
    ```
- Get subjects and cabinets
  - GET `.../lesson/requirements`
  - ```typescript
    //tuples: [id, name]
    type res = {
      subjects: [ number, string ][]
      cabinets: [ number, string ][]
    }
    ```
- Get specializations
  - GET `.../points/specializations`
  - ```typescript
    //tuples: [id, name]
    type res = [ number, string ][]
    ```
- Get groups by specialization id
  - GET `.../points/groups/:specialization_id`
  - ```typescript
    //tuples: [id, name]
    type res = [ number, string ][]
    ```
- Get students by group id
  - GET `.../points/students/:group_id`
  - ```typescript
    //tuples: [id, name]
    type res = [ number, string ][]
    ```
- Getting points for student subjects attendance by student id
  - GET `.../points/:student_id`
  - ```typescript
    type res = Array<{
      subject: string
      attendances: number
      points: string
      sum: number
      avg: number
    }>
    ```

### Types Reference:
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
