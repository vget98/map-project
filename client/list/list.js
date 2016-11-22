angular.module(`cordsList`, [])
  .controller(`cordsListController`, [`data`, `$rootScope`, function(data, $rootScope) {
    const cl = this;
    cl.cordslist;

    // Loads data from pct-data.json into local storage and set variable to it for data binding
    cl.setlist = () => {
      data.loadData()
        .then((response) => {
          window.localStorage.setItem(`listData`, response);
          cl.cordslist = JSON.parse(window.localStorage.getItem(`listData`));

          // Broadcast to map controller to update map data
          $rootScope.$broadcast(`updateMap`);
        })
        .catch((err) => {
          console.log(err);
        })
    };

    // Saves edit to local storage and updates map
    cl.edit = (cords, index) => {
      // Use this to parse the input strings from the edits
      for (let i = 0; i < 3; i++) {
        cords[i] = JSON.parse(cords[i]);
      }
      window.localStorage.setItem(`listData`, JSON.stringify(cl.cordslist));
      $rootScope.$broadcast(`updateMap`);
    };

    // Deletes coordinate from list, updates local stroage and broadcast to map controller tp update
    cl.delete = (index) => {
      cl.cordslist.splice(index, 1);
      window.localStorage.setItem(`listData`, JSON.stringify(cl.cordslist));
      $rootScope.$broadcast(`updateMap`);
    };

    // Event listener for any updates to local storage
    $rootScope.$on(`updateList`, () => {
      cl.cordslist = JSON.parse(window.localStorage.getItem(`listData`));
    });

  }])
