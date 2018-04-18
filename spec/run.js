import Jasmine from 'jasmine';

let jasmine = new Jasmine();
// modify this line to point to your jasmine.json
jasmine.loadConfigFile('../GOAL-TRACKER/spec/support/jasmine.json');
jasmine.execute();