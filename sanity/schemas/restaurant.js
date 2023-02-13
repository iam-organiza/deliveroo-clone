import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Restaurant',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image of the Restaurant',
    }),
    defineField({
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Restaurant',
    }),
    defineField({
      name: 'lng',
      type: 'number',
      title: 'Longtitude of the Restaurant',
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Restaurant address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Enter a rating from (1-5 Stars)',
      validation: (Rule) => Rule.required().min(1).max(5).error('Please a value between 1 and 5'),
    }),
    defineField({
      name: 'type',
      type: 'reference',
      to: [{type: 'category'}],
      title: 'Category',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dishes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
      title: 'Dishes',
    }),
  ],
})
