Feature: Workers

    Scenario: Valid Authorized call
        Given I fetch 1 authorized valid worker
        Then I expect a 200 error code
        Then I should get all the expected listed fields
        Then The fields should have expected data

    Scenario: Valid Unauthorized call
        Given I fetch 1 unauthorized valid worker
        Then I expect a 401 error code

    Scenario: Invalid Authorized call
        Given I fetch 1 authorized invalid worker
        Then I expect a 404 error code

    Scenario: Invalid unauthorized call
        Given I fetch 1 unauthorized invalid worker
        Then I expect a 401 error code

    Scenario: Multiple Valid Authorized call
        Given I fetch 5 authorized valid workers
        Then I expect a 200 error code
        Then I should get all the expected listed fields
        Then The fields should have expected data

