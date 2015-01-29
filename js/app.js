(function() {
	var app = angular.module('LFViewer', []);

	app.controller('LargeFormatController', ['$scope', '$window', function($scope, $window) {
		$scope.appId = "18575";
		$scope.clientIP = "66.191.255.4";
		$scope.udidType = 11;
		$scope.udidValue = "abcdefghijkstephenisawesome";
		$scope.deviceGen = "iPhone 5";
		$scope.osVersion = "8.1";
		$scope.placement = "Game Launch";

		$scope.submit = function() {
			var session = {
				IsHacked: false,
				DeviceGenerationInfo: $scope.deviceGen,
				PublisherSDKVersion: "API",
				IsUsingSdk: false,
				PublisherUserId: "blah",
				OSVersion: $scope.osVersion,
				UDIDs: [{
					Value: $scope.udidValue,
					Type: $scope.udidType
				}],
				AppId: $scope.appId,
				ClientIp: $scope.clientIP,
				IsOnWifi: true

			}
			$.ajax({
			  url: "http://api.w3i.com/PublicServices/MobileTrackingApiRestV1.svc/Session/Get",
			  type: "POST",
			  headers: {
			  	Accept: "Application/json",
			  	"Content-Type" : "Application/json"
			  },
			  data: JSON.stringify(session)
			})
			  .done(function( data ) {
			    if (data && data.Session && data.Session.SessionIdAsString) {
			    	var url = "http://appclick.co/Richmedia?SessionId=" + data.Session.SessionIdAsString + "&IsSKViewEnabled=0&placement=" + $scope.placement + "&placementtype=interstitial&IsMultiOffer=true";
			    	console.log(url);
			    }
			  });
		}
	}]);

})();