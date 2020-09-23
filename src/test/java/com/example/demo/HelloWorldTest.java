package com.example.demo;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class HelloWorldTest {

    HelloWorld helloWorld = new HelloWorld();

    @Test
    void helloWorld() {
        assertThat(helloWorld.helloWorld()).isNotNull();
    }

}
