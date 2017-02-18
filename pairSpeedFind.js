
function find_pair_sums(data, sum){
    var start = window.performance.now();
    data.slice(0);
    //prior sorting ascending
    data.sort(function(a,b){
        return a-b;
    });
    //hold
    var pairs=[];
//length of array
    var i=0,k=data.length-1;
    //while starting from opposite sides of the array
    while( i<data.length && k>0){
        // hold values as they converge
        var a = data[i],  b = data[k];
        //establish a condition where the values meet the sum condition
        if(a+b === sum){
            //push pairs
            pairs.push([a,b]);
            // ascend the inferior pointer in the ascending direction when a is  qualified by b to produce the sum
            while(i<data.length && data[i] === a){
                i++;
            }
            //  descend superior pointer when a is  qualified by a to produce the sum
            while(k>=0 && data[k] === b){
                k--;
            }
        }
        // else if the product is less than the desired value increment inferior pointer
        else if(a+b < sum){
            while(i<data.length && data[i++] === a);
            //else the  product is more than the desired value and we decrement the superior pointer
        }else {
            while(k>=0 && data[k--] === b);
        }
    }
    var end = window.performance.now();
    console.log(end-start);
    return pairs;
}

console.log('find_pair_sums', find_pair_sums(randomNumbersArray,20));

function flag_find(data, sum){
    var start = window.performance.now();
    //store pairs
    var pairs=[];
    //store all iterated values as the additive
    var found=[];
        // use symbol.iterator to iterate over the values
    for(var i of data){
        //use subtraction property of equality to find the additive inverse of the stored iterated value
        //also check if pairs are already in array to avoid duplicates
        if(found[sum - i] === true && pairs[[i,sum-i]] !== true){
            //store pair's
            pairs.push([i,sum-i]);
            //store redundancy flag on pair's
            pairs[[i, sum-i]]=true;
        }
        // add additive flag
        found[i]= true;
    }

    var end = window.performance.now();
    console.log(end -start);
    return pairs;
}

console.log('flag_find', flag_find(randomNumbersArray, 20));


var count_pairs = function(_arr,x) {
    var start = window.performance.now();
    if(!x) x = 0;
    var pairs2=[];
    var pairs = 0;
    var i = 0;
    var k = _arr.length-1;
    if((k+1)<2) return pairs;
    var halfX = x/2;
    while(i<k) {
        var curK = _arr[k];
        var curI = _arr[i];
        var pairsThisLoop = 0;
        if(curK+curI==x) {
            // if midpoint and equal find combinations

            pairs2.push([curK, curI] );
            if(curK==curI) {
                var comb = 1;
                while(--k>=i) pairs+=(comb++);
                break;
            }
            // count pair and k duplicates
            pairsThisLoop++;
            while(_arr[--k]==curK) pairsThisLoop++;
            // add k side pairs to running total for every i side pair found
            pairs+=pairsThisLoop;
            while(_arr[++i]==curI) pairs+=pairsThisLoop;
        } else {
            // if we are at a mid point
            if(curK==curI) break;
            var distK = Math.abs(halfX-curK);
            var distI = Math.abs(halfX-curI);
            if(distI > distK) while(_arr[++i]==curI);
            else while(_arr[--k]==curK);
        }
    }
    var end = window.performance.now();
    console.log('time end', end-start);
    return pairs2;
};


console.log('count pairs', count_pairs(randomNumbersArray, 20))





var count_pairs_unsorted = function(_arr,x) {
    // setup variables
    var asc_arr = [];
    var len = _arr.length;
    if(!x) x = 0;
    var pairs = 0;
    var i = -1;
    var k = len-1;
    if(len<2) return pairs;
    // tally all the like numbers into buckets
    while(i<k) {
        asc_arr[_arr[i]]=-(~(asc_arr[_arr[i]]));
        asc_arr[_arr[k]]=-(~(asc_arr[_arr[k]]));
        i++;
        k--;
    }
    // odd amount of elements
    if(i==k) {
        asc_arr[_arr[k]]=-(~(asc_arr[_arr[k]]));
        k--;
    }
    // count all the pairs reducing tallies as you go
    while(i<len||k>-1){
        var y;
        if(i<len){
            y = x-_arr[i];
            if(asc_arr[y]!=undefined&&(asc_arr[y]+asc_arr[_arr[i]])>1) {
                if(_arr[i]==y) {
                    var comb = 1;
                    while(--asc_arr[_arr[i]] > 0) {pairs+=(comb++);}
                } else pairs+=asc_arr[_arr[i]]*asc_arr[y];
                asc_arr[y] = 0;
                asc_arr[_arr[i]] = 0;
            }

        }
        if(k>-1) {
            y = x-_arr[k];
            if(asc_arr[y]!=undefined&&(asc_arr[y]+asc_arr[_arr[k]])>1) {
                if(_arr[k]==y) {
                    var comb = 1;
                    while(--asc_arr[_arr[k]] > 0) {pairs+=(comb++);}
                } else pairs+=asc_arr[_arr[k]]*asc_arr[y];
                asc_arr[y] = 0;
                asc_arr[_arr[k]] = 0;
            }

        }
        i++;
        k--;
    }
    return pairs;
}


console.log('countpairs unsorted', count_pairs_unsorted(randomNumbersArray, 20));




function fastfind(data, target){
    data.slice(0);
    data.sort(function(a,b){
        return a-b;
    });
    var pairs= [];
    i = 0;
    j = data.length - 1;
    while(i < j ){
        var a=data[i], b=data[j];
        if(a + b === target){

            pairs.push([a,b]);
            i++;
            j--;

        }
        else if (a + b <  target) i += 1;
        else if (a + b >  target) j -= 1;


    }



    return pairs;

}
