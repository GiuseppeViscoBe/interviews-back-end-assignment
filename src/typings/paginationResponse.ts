import { Response } from 'express';
import { PaginationResult } from './paginationResult'; // Importa l'interfaccia PaginationResult

export interface PaginationResponse extends Response {
  results?: PaginationResult;
}