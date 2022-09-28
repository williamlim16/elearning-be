import { gql } from 'apollo-server-express'
import { prisma } from '../../repository/index'

export const typeDef = gql`
  type Course {
    id: String!
    name: String!
    averageRating: Float
    lecturerId: String!
  }

  extend type Query{
    allCourses: [Course!]!
    getCourseByID(id:String!): Course!
  }

  extend type Mutation {
    addCourse(name: String!, id: String!): addCourseResponse!
  }

  type addCourseResponse {
  code: Int!
  success: Boolean!
  message: String!
  course: Course
  }
`

export const resolvers = {
  Query: {
    allCourses: () => {
      return prisma.course.findMany()
    },
    getCourseByID: (parent: any, args: any, context: any, info: any) => {
      return prisma.course.findUnique({
        where: {
          id: args.id
        }
      })
    }
  },
  Mutation: {
    addCourse: (_: any, args: any) => {
      const course = prisma.course.create({
        data: {
          name: args.name as string,
          lecturerId: args.id
        }
      })
      if (course === undefined) {
        return {
          code: '500',
          success: false,
          message: 'Something went wrong sorry!'
        }
      }
      return {
        code: '200',
        success: true,
        message: 'Success',
        course
      }
    }
  }
}
