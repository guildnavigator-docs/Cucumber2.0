Feature: Workers

    Scenario: Get Workers
        Given I fetch a worker
        Then I should get all the listed fields
        Then The fields should have expected data
        Then Unauthorized calls should return 401
        Then Invalid Worker IDs should return 404 