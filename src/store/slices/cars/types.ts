export interface Engine {
  power: number;
  volume: number;
  transmission: string;
  fuel: string;
}

export type DataTypes = {
  _id: string;
  mark: string;
  model: string;
  engine: Engine;
  drive: string;
  equipmentName: string;
  price: number;
  createdAt: Date;
};

export interface CarsState {
  data: DataTypes[];
  loading: boolean;
  error: string | null;
}