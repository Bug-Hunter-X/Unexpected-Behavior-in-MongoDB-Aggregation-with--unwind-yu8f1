```javascript
const pipeline = [
  {
    $lookup: {
      from: "collectionB",
      localField: "_id",
      foreignField: "foreignKey",
      as: "results"
    }
  },
  {
    $unwind: {
      path: "$results",
      preserveNullAndEmptyArrays: true // added to fix the bug
    }
  },
  {
    $project: {
      _id: 1,
      fieldFromA: 1,
      fieldFromB: "$results.fieldFromB"
    }
  }
];

const cursor = db.collection('collectionA').aggregate(pipeline);

cursor.forEach(doc => {
  console.log(doc);
});
```