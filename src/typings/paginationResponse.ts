import { Response } from 'express';
import { PaginationResult } from './paginationInterface'; // Importa l'interfaccia PaginationResult

export interface PaginationResponse extends Response {
  paginatedResult?: PaginationResult;
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
}