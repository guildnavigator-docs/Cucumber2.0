Feature: Workers

    # Scenario: Valid Authorized call
    #     Given I fetch 1 authorized valid worker
    #     Then I expect a 200 error code
    #     And I should get all the expected listed fields
    #     And The fields should have expected data
    #     And The fields are in the correct order

    # Scenario: Valid Unauthorized call
    #     Given I fetch 1 unauthorized valid worker
    #     Then I expect a 401 error code

    # Scenario: Invalid Authorized call
    #     Given I fetch 1 authorized invalid worker
    #     Then I expect a 404 error code

    # Scenario: Invalid unauthorized call
    #     Given I fetch 1 unauthorized invalid worker
    #     Then I expect a 401 error code
    
    # Scenario: Multiple Valid Authorized call
    #     Given I fetch 5 authorized valid workers
    #     Then I expect a 200 error code
    #     And I should get all the expected listed fields
    #     And The fields should have expected data

    # Scenario: Patch Existing Employee Info
    #     Given I fetch 1 authorized valid worker
    #     Then I should get all the expected listed fields
    #     And The fields should have expected data
    #     And The fields are in the correct order
    #     When I change the notes field
    #     And I expect a 200 error code
    #     When I fetch 1 authorized valid worker
    #     Then The changed field will be present
    #     And I change it back

    Scenario: Activate Entity
        Given I fetch 1 authorized valid worker
        When I deactivate one worker
        Then I expect a 200 error code
        When I activate one worker
        Then I expect a 200 error code
