var app = angular.module('lumina',['chart.js']);

app.filter('caseFilter',function(){
	return function(input){
    if(input){
        return input.substr(0, 1).toUpperCase() + input.substr(1).replace(/_([aA-zZ])/g, function(g) {
          return ' ' + g[1].toUpperCase();
      });
    }
  };
});
app.controller('luminaController',['$scope', '$rootScope', '$filter' ,function($scope, $rootScope,$filter){
	  $scope.allObj = {};
	  $scope.pieCht = false;
	  $scope.allObj.mdName = 50;
	  $scope.labels = ['English','Maths','Science','Lang 1','Lang 2'];
      
	  $scope.series = ['pass','fail'];
	  $scope.data = [
		[0,0,0,0,0]
	  ];
	  $scope.dataSets = [{
		backgroundColor: '#4dff4d'  
	  },
	  {
		backgroundColor: '#ff4d4d'  
	  }
	  ]
	  $scope.chtPieOptions = {
		title: {
            display: true,
            text: 'Pie Chart'
        },
        legend: {
		   display: true	
		},
		tooltips:{
		  callbacks:{
			label:function(tooltipItem, data) {
				var labels = data.labels;
				var dataItems = data.datasets[0].data;
				var indexVal = tooltipItem.index;
				return labels[indexVal] +'  ' +(dataItems[indexVal] * 100) / $scope.allObj.mdName +'%';
			  }  
		   }	
		}
	  }
	  $scope.chtOptions = {
		title: {
            display: true,
            text: 'Calumn chart for over all valuation'
        },
        legend: {
		   display: true	
		},
        scales: {
			xAxes: [{
			  stacked:true
			}],
            yAxes: [{
                ticks: {
                    max: $scope.mdName,
                    stepSize: 10,
                    beginAtzero:true,
                    min: 0
                }
            }]
        }
    }
    $scope.pieFun = function(val){
		if($scope.allObj.mdName > $scope.allObj[val]){
		  $scope.selPie = val;
		  $scope.chtPieOptions.title.text = $filter('caseFilter')(val) + ' pie chart';
		  $scope.pieCht = true;
		  $scope.pieLabel = ['pass','fail']
		  $scope.pieData = [$scope.allObj[val],$scope.allObj.mdName - $scope.allObj[val]];
		}
	    else{
		  $scope.pieCht = false;	
	    }
	}
    $scope.$watch('allObj',function(newVal,oldVal){
	    $scope.chtOptions.scales.yAxes[0].ticks.max = newVal.mdName;
	    $scope.chtOptions.scales.yAxes[0].ticks.stepSize = newVal.mdName / 10;
	    $scope.chtOptions.scales.yAxes[0].ticks.min = 0;
	    var dataArr = [];
	    dataArr.push(newVal.english,newVal.maths,newVal.science,newVal.lang1,newVal.lang2);
	    $scope.data = [];
	    $scope.data.push(dataArr);
	    $scope.data.push([newVal.mdName,newVal.mdName,newVal.mdName,newVal.mdName,newVal.mdName]);
	    if($scope.selPie){$scope.pieFun($scope.selPie)}
    },true)
      
	  
}]);
