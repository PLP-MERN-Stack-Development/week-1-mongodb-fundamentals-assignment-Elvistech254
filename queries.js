
db.createCollection("plp_bookstore")
db.books.insertMany( [ {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
]);


db.books.find({ genre: "fiction" });
db.books.find({ published_year: { $gt: 1990 } });
db.books.find({ author: "Herman Melville" });


db.books.updateOne({ title: "The Alchemist" }, { $set: { price: 12.99 } });


db.books.deleteOne({ title: "Animal Farm" });


db.books.find(
    { inStock: true, publishedYear: { $gt: 2010 } },
    { _id: 0, title: 1, author: 1, price: 1 }
  )
  .sort({ price: 1 })  
  .skip(0)             
  .limit(5);


  db.books.find(
    { inStock: true, publishedYear: { $gt: 2010 } },
    { _id: 0, title: 1, author: 1, price: 1 }
  )
  .sort({ price: -1 })  
  .skip(5)             
  .limit(5);
  const page = 4; 
  const pageSize = 5;
  const skip = (page - 1) * pageSize;


  db.books.aggregate([
    {
      $group: {
        _id: "$genre",                  
        averagePrice: { $avg: "$price" }  
      }
    },
    {
      $sort: { averagePrice: -1 }       
    }
  ]);
  {
    _id: 'Fantasy',
    averagePrice: 17.49
  }
  {
    _id: 'Adventure',
    averagePrice: 12.5
  }
  {
    _id: 'Dystopian',
    averagePrice: 11.245000000000001
  }
  

  db.books.aggregate([
    {
      $group: {
        _id: "$author",             
        bookCount: { $sum: 1 }      
      }
    },
    {
      $sort: { bookCount: -1 }     
    },
    {
      $limit: 1                    
    }
  ]);


  db.books.aggregate([
    {
      $project: {
        decade: {
          $concat: [
            { $toString: { $multiply: [ { $floor: { $divide: ["$publishedYear", 10] } }, 10 ] } },
            "s"
          ]
        }
      }
    },
    {
      $group: {
        _id: "$decade",            
        count: { $sum: 1 }         
      }
    },
    {
      $sort: { _id: 1 }            
    }
  ]);


  db.books.createIndex({ title: 1 });
title_1
db.books.createIndex({ author: 1, publishedYear: -1 });
author_1_publishedYear_-1
db.books.find({ title: "Animal Farm" }).explain("executionStats");