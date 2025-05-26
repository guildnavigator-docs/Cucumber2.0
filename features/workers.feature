Feature: Workers

    Scenario: Get Workers
        Given I fetch a worker
        Then I should get all the listed fields
        Then The fields should have expected data