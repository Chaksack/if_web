export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 400,
    public details?: Record<string, any>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    return {
      error: {
        code: 'INTERNAL_ERROR',
        message: error.message,
      },
      statusCode: 500,
    }
  }

  return {
    error: {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
    },
    statusCode: 500,
  }
}

