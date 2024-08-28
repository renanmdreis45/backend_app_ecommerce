import { Column } from "typeorm/decorator/columns/Column";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity({ name: "purchase" })
export class Purchase {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    productId: string;
  
    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    category: string;

    @Column({ nullable: false })
    price: string;

    @Column({ nullable: false })
    quantity: number;

    @Column({ nullable: false })
    material: string;

    @Column({ nullable: false})
    department: string;

    @Column({ nullable: false})
    userName: string;

    @CreateDateColumn()
    createdAt: Date;
}