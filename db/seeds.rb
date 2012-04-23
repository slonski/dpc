# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Shape.create [
  { name: 'round' },
  { name: 'princess' },
  { name: 'emerald' },
  { name: 'oval' },
  { name: 'marquise' },
  { name: 'pear' },
  { name: 'radiant' },
  { name: 'asscher' },
  { name: 'heart' },
  { name: 'trilliant' },
  { name: 'cushion' }
]

Cut.create [
  { grade: 'excellent' },
  { grade: 'very good' },
  { grade: 'good' },
  { grade: 'fair' },
  { grade: 'poor' }
]

Clarity.create [
  { grade: 'FL' },
  { grade: 'IF' },
  { grade: 'VVS1' },
  { grade: 'VVS2' },
  { grade: 'VS1' },
  { grade: 'VS2' },
  { grade: 'SI1' },
  { grade: 'SI2' },
  { grade: 'SI3' },
  { grade: 'I1' },
  { grade: 'I2' },
  { grade: 'I3' }
]

Color.create [
  { grade: 'D' },
  { grade: 'E' },
  { grade: 'F' },
  { grade: 'G' },
  { grade: 'H' },
  { grade: 'I' },
  { grade: 'J' },
  { grade: 'K' },
  { grade: 'L' },
  { grade: 'M' },
  { grade: 'N' }
]

Certificate.create [
  { name: 'GIA' },
  { name: 'EGL' },
  { name: 'IGI' },
  { name: 'AGS' },
  { name: 'HRD' },
  { name: 'GCAL' }
]

Type.create [
  { name: 'R', description: 'ring' },
  { name: 'E', description: 'earring' },
  { name: 'N', description: 'necklace' },
  { name: 'P', description: 'pendant' },
  { name: 'B', description: 'bracelet' },
  { name: 'C', description: 'cross' },
  { name: 'S', description: 'set' }
]