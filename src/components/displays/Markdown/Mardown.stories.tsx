import type { Meta, StoryObj } from '@storybook/react';

import Markdown from '.';
import { DEFAULT_MARKDOWN } from './constants';

const ALL = `# Title H1
## Title H2
### Title H3
#### Title H4  
##### Title H5

---
~~barré~~
- first item
- second item
  - nested

| firstname  | lastname |
|:-----------|:-------- |
| John       | Doe      |
| Niels      | Bravo    |

| firstname | lastname | age | city | occupation | email              | phone        | country | company       | department   |
|:----------|:---------|:----|:-----|:-----------|:-------------------|:-------------|:--------|:--------------|:-------------|
| John      | Doe      | 32  | NY   | Engineer   | john.doe@mail.com  | 123-456-7890 | USA     | TechCorp      | R&D          |
| Niels     | Bravo    | 29  | LA   | Designer   | niels.bravo@mail.com | 987-654-3210 | USA     | DesignWorks   | Creative     |
| Maria     | Smith    | 45  | SF   | Manager    | maria.smith@mail.com | 456-789-1234 | USA     | BizSolutions  | Operations   |
| Aisha     | Lee      | 38  | TX   | Developer  | aisha.lee@mail.com  | 321-654-9870 | USA     | CodeCrafters  | IT           |
| Ricardo   | Gomez    | 26  | FL   | Analyst    | ricardo.gomez@mail.com | 789-123-4567 | USA     | DataInsights  | Finance      |

##### Tasks
- [ ] Read
- [x] Create

# Code
\`\`\`ruby
# Define a class called Greeter
class Greeter
  # Initialize the Greeter with a name
  def initialize(name)
    @name = name
  end

  # Method to greet the person
  def say_hello
    puts "Hello, #{@name}!"
  end

  # Method to say goodbye to the person
  def say_goodbye
    puts "Goodbye, #{@name}!"
  end
end

# Create a new instance of Greeter
greeter = Greeter.new("Alice")

# Call methods on the Greeter instance
greeter.say_hello
greeter.say_goodbye

# Define a standalone function to greet everyone
def greet_everyone
  names = ["Alice", "Bob", "Charlie"]
  names.each do |name|
    puts "Hello, #{name}!"
  end
end

# Call the function to greet everyone
greet_everyone
\`\`\`

In this example:

- We define a \`Greeter\` class with an initializer method (\`initialize\`) that takes a \`name\` as a parameter.
- The class has two methods: \`say_hello\` and \`say_goodbye\` to print greetings.
- We create an instance of \`Greeter\` with the name "Alice" and call its methods.
- Additionally, there's a standalone function \`greet_everyone\` that greets multiple names in an array.

This provides a basic demonstration of classes, objects, and iterating over collections in Ruby.
And this is TSX Block code :
\`\`\`tsx
const App = () => {
  return (<div>Hello world</div>);
}
\`\`\`

And here is an AppleScript example:
\`\`\`applescript
-- Simple AppleScript to open Safari and navigate to a website
tell application "Safari"
    activate
    make new document with properties {URL:"https://www.apple.com"}
end tell

-- Display a simple dialog box with a message
display dialog "Hello, this is an AppleScript example!" buttons {"OK"} default button "OK"
\`\`\`

And here is a Java example:
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

And here is a 6502 Assembly example:
\`\`\`asm6502
; 6502 Assembly example: Setting the accumulator to 10
LDA #$0A   ; Load hexadecimal 0A (decimal 10) into the accumulator
STA $0200  ; Store the value from the accumulator into memory address $0200
\`\`\`

And here is an Apache configuration example:
\`\`\`apacheconf
# Apache configuration example to set the document root
<VirtualHost *:80>
    DocumentRoot "/www/example"
    ServerName example.com
</VirtualHost>
\`\`\`

And here is an AWK example:
\`\`\`awk
# AWK example: Print first and last name from a text file
awk '{print $1, $2}' names.txt
\`\`\`

And here is a Bash example:
\`\`\`bash
# Bash example: Simple for loop
for i in {1..5}; do
    echo "Loop number $i"
done
\`\`\`

And here is a BASIC example:
\`\`\`basic
REM BASIC example: Simple print statement
PRINT "Hello, World!"
\`\`\`

And here is a Batch file example:
\`\`\`batch
:: Batch file example: Display text in command prompt
@echo off
echo Hello, Batch World!
pause
\`\`\`

And here is a Brainfuck example:
\`\`\`brainfuck
# Brainfuck example: Print "Hello"
+[----->+++<]>++.+++++++..+++.---.+++++++++++.
\`\`\`

And here is a C example:
\`\`\`c
// C example: Print "Hello, World!"
#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}
\`\`\`

And here is a CMake example:
\`\`\`cmake
# CMake example: Define a minimum required version
cmake_minimum_required(VERSION 3.10)
project(HelloWorld)
\`\`\`

And here is a COBOL example:
\`\`\`cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. HelloWorld.
PROCEDURE DIVISION.
    DISPLAY 'Hello, World!'.
    STOP RUN.
\`\`\`

And here is a C++ example:
\`\`\`cpp
// C++ example: Hello World program
#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
\`\`\`

And here is a C# example:
\`\`\`csharp
// C# example: Print "Hello, World!"
using System;
class HelloWorld {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}
\`\`\`

And here is a CSS example:
\`\`\`css
/* CSS example: Simple text color styling */
body {
    color: blue;
}
\`\`\`

And here is a Dockerfile example:
\`\`\`dockerfile
# Dockerfile example: Base image
FROM ubuntu:latest
RUN echo "Hello, Docker!"
\`\`\`

And here is a Go example:
\`\`\`go
// Go example: Print "Hello, World!"
package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

And here is a GraphQL example:
\`\`\`graphql
# GraphQL example: Simple query
query {
    user(id: "1") {
        name
        email
    }
}
\`\`\`

And here is an HTTP example:
\`\`\`http
# HTTP example: GET request for a resource
GET /api/v1/resource HTTP/1.1
Host: example.com
\`\`\`

And here is a JavaScript example:
\`\`\`javascript
// JavaScript example: Alert message
alert("Hello, World!");
\`\`\`

And here is a JSON example:
\`\`\`json
// JSON example: Simple user data
{
    "name": "John Doe",
    "age": 30,
    "isAdmin": false
}
\`\`\`

And here is a JSX example:
\`\`\`jsx
// JSX example: Hello World component
const HelloWorld = () => <h1>Hello, World!</h1>;
\`\`\`

And here is a Kotlin example:
\`\`\`kotlin
// Kotlin example: Hello World
fun main() {
    println("Hello, World!")
}
\`\`\`

And here is a LaTeX example:
\`\`\`latex
% LaTeX example: Document setup
\\documentclass{article}
\\begin{document}
Hello, World!
\\end{document}
\`\`\`

And here is a Lua example:
\`\`\`lua
-- Lua example: Print "Hello, World!"
print("Hello, World!")
\`\`\`

And here is a Makefile example:
\`\`\`makefile
# Makefile example: Compile a C program
all:
    gcc main.c -o main
\`\`\`

And here is a Perl example:
\`\`\`perl
# Perl example: Hello World
print "Hello, World!\\n";
\`\`\`

And here is a PHP example:
\`\`\`php
<?php
// PHP example: Print Hello World
echo "Hello, World!";
?>
\`\`\`

And here is a Python example:
\`\`\`python
# Python example: Hello World
print("Hello, World!")
\`\`\`

And here is an R example:
\`\`\`r
# R example: Print Hello World
print("Hello, World!")
\`\`\`

And here is a Rust example:
\`\`\`rust
// Rust example: Print Hello World
fn main() {
    println!("Hello, World!");
}
\`\`\`

And here is a Sass example:
\`\`\`sass
// Sass example: Define a color variable
$primary-color: #333;
body {
    color: $primary-color;
}
\`\`\`

And here is a Scala example:
\`\`\`scala
// Scala example: Hello World
object HelloWorld extends App {
    println("Hello, World!")
}
\`\`\`

And here is an SCSS example:
\`\`\`scss
// SCSS example: Define a color variable
$font-color: #333;
body {
    color: $font-color;
}
\`\`\`

And here is a Shell example:
\`\`\`shell-session
# Shell example: List files
ls -la
\`\`\`

And here is an SQL example:
\`\`\`sql
-- SQL example: Select all rows from users table
SELECT * FROM users;
\`\`\`

And here is a Swift example:
\`\`\`swift
// Swift example: Print Hello World
print("Hello, World!")
\`\`\`

And here is a TypeScript example:
\`\`\`typescript
// TypeScript example: Define a typed variable
let message: string = "Hello, World!";
console.log(message);
\`\`\`

And here is a YAML example:
\`\`\`yaml
# YAML example: Basic configuration
name: John Doe
age: 30
isAdmin: false
\`\`\`

![base64 image](data:image/jpeg;base64,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)
`;

type Story = StoryObj<typeof Markdown>;

export default {
  title: 'displays/Markdown',
  component: Markdown,
} as Meta<typeof Markdown>;

export const Default: Story = {
  args: {
    children: DEFAULT_MARKDOWN,
  },
};

export const All: Story = {
  args: {
    children: ALL,
  },
};

export const Image: Story = {
  args: {
    children: `![Image](https://fastly.picsum.photos/id/306/260/260.jpg?hmac=_MPL2TI7mg-COGANK2n75aVqqhcXV3bAdTwsWe-7QCc)`,
  },
};

export const Link: Story = {
  args: {
    children:
      'The second chapter of "Domain-Driven Design: Tackling Complexity in the Heart of Software" by Eric Evans, titled "Binding Model and Implementation," discusses the intimate connection between domain models and their implementation in software. Evans emphasizes the need for modelers to be hands-on with the code to maintain the integrity and practicality of the design. The chapter addresses the importance of a ubiquitous language and collaboration between modelers and developers. Through these practices, teams can create software that effectively represents domain complexities, ensuring that insights and design decisions are consistently reflected in the code [xx735.Eric.Evans.Domaindriven.Design.Tackling.Complexity.in.the.Heart.of.Software.xx735.Eric.Evans.Domaindriven.Design.Tackling.Complexity.in.the.Heart.of.Software.pdf](/file-retrieval/api/v1/download/6f1ce74a-5c86-4664-b812-fb5b3428be61).',
  },
};
