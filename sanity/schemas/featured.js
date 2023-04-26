import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'featured menu categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'featured category name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price of the dish',
    }),
    defineField({
      name: 'restaurants',
      type: 'array',
      title: 'Restaurants',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    }),
  ],
})
