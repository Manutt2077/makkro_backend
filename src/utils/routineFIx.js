const { prisma } = require('../config/prismaClient')

async function verifyPrimaryKey() {
  try {
    const constraints = await prisma.$queryRaw`
      SELECT 
        tc.constraint_name,
        tc.constraint_type,
        kcu.column_name,
        tc.table_name
      FROM 
        information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu 
          ON tc.constraint_name = kcu.constraint_name
      WHERE 
        tc.table_name = 'routine_day_exercise' 
        AND tc.constraint_type = 'PRIMARY KEY'
      ORDER BY kcu.ordinal_position;
    `

    console.log('Primary Key Constraints:')
    console.log(constraints)

    
    const indexes = await prisma.$queryRaw`
      SELECT 
        indexname,
        indexdef
      FROM 
        pg_indexes 
      WHERE 
        tablename = 'routine_day_exercise';
    `

    console.log('\nIndexes:')
    console.log(indexes)

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyPrimaryKey()