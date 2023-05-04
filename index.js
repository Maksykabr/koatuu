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
    array.forEach(function(element) {
        if (element['Другий рівень'] == '') {
            first_array.push(element);
          } else if (element['Третій рівень'] == '') {
            second_array.push(element);
          } else if (element['Четвертий рівень'] == '') {
            thirth_arrray.push(element);
          } else {
            fourth_array.push(element);
          };
    });
};


function filter_array_elements(first_array, second_array, level, new_create, sorted_aray ){

  var first_element = 0;
  while (first_element <= first_array.length){
    object = first_array[first_element];
    filteredArr = second_array.filter(obj => obj[`${level} рівень`] === object[`${level} рівень`]);


    console.log(filteredArr)
    first_element++;
    
  };
  
  
  console.log('he')
  };

 
fs.readFile(file, 'utf-8', function(error, data){
  try
  {
    all_objects = JSON.parse(data);

    sort_levels(all_objects, first_sorted_level, second_sorted_level, thirth_sorted_level, fourth_sorted_level);
    // console.log(fourth_sorted_level)
    // filter_array_elements(first_sorted_level)
    // console.log(first_sorted_level)
    filter_array_elements(thirth_sorted_level, fourth_sorted_level, "Третій", "четвертого", thirth_prepared_levels);
    // console.log(thirth_sorted_level)
    // console.log(thirth_prepared_levels)
    // filter_array_elements(second_sorted_level, thirth_prepared_levels, "Другий", "третього", second_prepared_levels);
    // filter_array_elements(first_sorted_level, second_prepared_levels, "Другого", "другого", prepared_objects);

    fs.writeFile(new_file, JSON.stringify(prepared_objects), function(error){
      if (error) throw error;
    });
  }
  catch
  {
    console.log(error);
  }
});

