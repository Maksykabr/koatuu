var fs = require('fs');


var first_sorted_level = [];
var second_sorted_level = [];
var thirth_sorted_level = [];
var fourth_sorted_level = [];

var second_prepared_levels = [];
var thirth_prepared_levels = [];

var prepared_data = [];

var read_file = './data_parse/koatuu.json'
var new_file = './data_parse/new_koatuu.json'



fs.readFile(read_file, 'utf-8', function(err, data){
  if (err) throw err;
  var objects = JSON.parse(data);

  objects.forEach(function(element){
    if (element['Другий рівень'] == '') {
      first_sorted_level.push(element);
    } else if (element['Третій рівень'] == '') {
      second_sorted_level.push(element);
    } else if (element['Четвертий рівень'] == '') {
      thirth_sorted_level.push(element);
    } else {
      fourth_sorted_level.push(element);
    };
  });

  function filter_array_elements(first_array, second_array, level, new_create, sorted_aray ){-
    first_array.forEach(function(element){
      filteredArr = second_array.filter(obj => obj[`${level} рівень`] === element[`${level} рівень`]);
      element[`Масив елементів ${new_create} рівня` ] = filteredArr;
      sorted_aray.push(element)
        
    });
  };

  
  filter_array_elements(thirth_sorted_level, fourth_sorted_level, "Третій", "четвертого", thirth_prepared_levels);
  filter_array_elements(fourth_sorted_level, thirth_sorted_level, "Другий", "третього", second_prepared_levels);
  filter_array_elements(first_sorted_level, second_prepared_levels, "Перший", "другого", prepared_data);
  // console.log(prepared_data)
  // thirth_sorted_level.forEach(function(element){
  //   filteredArr = fourth_sorted_level.filter(function(obj){obj['Третій рівень'] === element['Третій рівень']})
  //   element['Масив елементів четвертого рівня'] = filteredArr;
  //   two_prepared_levels.push(element);
  //   console.log(filteredArr)

  // });

  // second_sorted_level.forEach(function(element){
  //   // filteredArr = two_prepared_levels.filter(function(obj){
  //   //   obj['Другий рівень'] === element['Другий рівень'];
  //   // });
  //   filteredArr = two_prepared_levels.filter(obj => obj['Другий рівень'] === element['Другий рівень'])
  //   element['Масив елементів третього рівня'] = filteredArr;
  //   three_prepared_levels.push(filteredArr)
  // });
  
  // first_sorted_level.forEach(function(element){
  //   filteredArr = three_prepared_levels.filter(function(obj){
  //     obj['Перший рівень'] === element['Перший рівень'];
  //   });
  //   element['Масив елементів другого рівня'] = filteredArr;
  //   prepared_data.push(element);
  // });

  new_data = JSON.stringify(prepared_data);
  // console.log(new_data)
  fs.writeFileSync(new_file, new_data, function(err){
    if  (err) throw err;
  });
});
