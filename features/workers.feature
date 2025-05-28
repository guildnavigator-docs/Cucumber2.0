Feature: Workers

    Scenario: Get Workers
        Given I fetch 1 authorized valid worker
        Then I should get all the expected listed fields
        Then The fields should have expected data

    Scenario: Valid Unauthorized call
        Given I fetch 1 unauthorized valid worker
        Then I expect a 401 error code

    Scenario: Invalid Authorized Worker ID
        Given I fetch 1 authorized invalid worker
        Then I expect a 404 error code