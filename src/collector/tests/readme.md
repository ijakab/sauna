We could also add Collector unit tests. But, Collector is holding all the logic, and e2e tests are testing Collectors

Unit tests could be made with a lot of mocking, e.g. to detect weather certain functions have been called, or weather recursion stopped.

While those would add some value, in my opinion these kind of tests rarely catch bugs and are often burden as they need to be refactored with original code.

All in all, I'd say these tests would be just to reach certain coverage target, and would be more trouble than they are worth
