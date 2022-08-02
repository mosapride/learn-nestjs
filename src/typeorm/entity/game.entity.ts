import { GameDto } from "src/endpoint/dto/game.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonDate } from "../mix/data.entity";


@Entity('game') 
export class GameEntity extends CommonDate implements GameDto{
    @PrimaryGeneratedColumn({ name: 'game_id' })
    gameID: number;
    @Column({ name: 'name' })
    name: string;
    @Column({ name: 'sales' })
    sales: number;

}