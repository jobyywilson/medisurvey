package com.example.medisurveyservice.model;


/**
 * @author joby.w
 *
 */

public class User {

	private final String id;

	private final String username;

	private final String password;

	private final String firstName;

	private final String lastName;
	
	private final String role;
	
	private String defaultQuestionSet;

	public User(String id, String username, String password, String firstName, String lastName, String role) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getRole() {
		return role;
	}

	public String getId() {
		return id;
	}

	public String getDefaultQuestionSet() {
		return defaultQuestionSet;
	}

	public void setDefaultQuestionSet(String defaultQuestionSet) {
		this.defaultQuestionSet = defaultQuestionSet;
	}

}
