package com.example.demo.domain;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table (name = "applications") //Might be autogenerated with the schema?
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public final class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String logo;
    private String link;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH}, fetch =  FetchType.LAZY)
    @JoinTable(name = "package_application",
        joinColumns = @JoinColumn(name = "package_id", foreignKey = @ForeignKey(name = "fk_package_applicatino")),
        inverseJoinColumns = @JoinColumn (name="application_id", foreignKey = @ForeignKey(name = "fk_application_package")))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private final Set<Package> packages = new HashSet<>();

}
