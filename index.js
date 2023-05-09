var fs = require('fs');

var file = './data_parse/koatuu.json';
var new_file = './data_parse/new_koatuu.json';


var first_sorted_level = [];
var second_sorted_level = [];
var thirth_sorted_level = [];
var fourth_sorted_level = [];

var second_prepared_levels = [];
var thirth_prepared_levels = [];

var prepared_objects = [];

function sort_levels(array, first_array, second_array, thirth_arrray, fourth_array){
  var element = 0;
  while (element <= array.length) {
    object = array[element]
    try
    {
      if (object['Другий рівень'] == '') {
        first_array.push(object);
      } else if (object['Третій рівень'] == '') {
        second_array.push(object);
      } else if (object['Четвертий рівень'] == '') {
        thirth_arrray.push(object);
      } else {
        fourth_array.push(object);
        
      };
    }
    catch (err)
    {
      console.log(err)
    }
    finally
    {
      element++;
    };
  };
};



function filter_array_elements(first_array, second_array, level, new_create, sorted_aray ){
  var element = 0;
  while (element <= first_array.length){
    object = first_array[element];
    try
    {
      sortedArr = second_array.filter(obj => obj[`${level} рівень`] === object[`${level} рівень`]);
      object[`Масив елементів ${new_create} рівня`] = sortedArr;
      sorted_aray.push(object);
      
    }
    catch(err)
    {
      console.log(err)
    }
    finally
    {
      element++;
    };
    };
  };

 
fs.readFile(file, 'utf-8', function(error, data){
  try
  {
    all_objects = JSON.parse(data);

    sort_levels(all_objects, first_sorted_level, second_sorted_level, thirth_sorted_level, fourth_sorted_level);

    filter_array_elements(thirth_sorted_level, fourth_sorted_level, "Третій", "четвертого", thirth_prepared_levels);
    filter_array_elements(second_sorted_level, thirth_prepared_levels, "Другий", "третього", second_prepared_levels);
    filter_array_elements(first_sorted_level, second_prepared_levels, "Перший", "другого", prepared_objects);

    fs.writeFile(new_file, JSON.stringify(prepared_objects), function(error){
      if (error) throw error
    });
  }
  catch(error)
  {
    console.log(error);
  };
});

