var Q = require('q');

module.exports = telme = function telme(question) {
 var stdin = process.stdin, stdout = process.stdout;
 var deferred = Q.defer();

 stdin.resume();
 stdout.write(question + ": ");

 stdin.once('data', function(data) {
   data = data.toString().trim();
   stdin.pause();
   deferred.resolve(data);
 });

 return deferred.promise;
};
