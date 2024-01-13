import { Book } from "../domain/entities/Book";
import { ErrorBase, ErrorsData } from "./ErrorBase";

type BookErrorNames =
	| "INVALID_DTO"
	| "INVALID_TITLE"
	| "DUPLICATED_BOOK"
	| "BOOK_NOT_FOUND";

export type BookResult = Book | Book[] | BookError;

export const BOOK_ERRORS: ErrorsData<BookErrorNames> = {
	INVALID_DTO: {
		message: "The sent informations are invalid, please check and try again.",
		httpCode: 400,
	},
	INVALID_TITLE: {
		message: "The title is required to search books.",
		httpCode: 400,
	},
	DUPLICATED_BOOK: {
		message: "This book is already registered.",
		httpCode: 400,
	},
	BOOK_NOT_FOUND: {
		message: "We don't have any book registered with this title.",
		httpCode: 404,
	},
};

export class BookError extends ErrorBase<BookErrorNames> {
	constructor(errorName: BookErrorNames, cause?: any) {
		super(
			errorName,
			BOOK_ERRORS[errorName].message,
			BOOK_ERRORS[errorName].httpCode,
			cause
		);
	}
}

export class DuplicatedBookError extends ErrorBase<"DUPLICATED_BOOK"> {
	constructor() {
		super(
			"DUPLICATED_BOOK",
			"A book with this combination of title and edition already exists.",
			400
		);
	}
}

export class InvalidBookInputError extends ErrorBase<"INVALID_INPUT"> {
	constructor(cause?: any) {
		super("INVALID_INPUT", "The input is invalid.", 400, cause);
	}
}

export class BookNotFoundError extends ErrorBase<"BOOK_NOT_FOUND"> {
	constructor() {
		super("BOOK_NOT_FOUND", "No book was found.", 400);
	}
}

export class InvalidTitleError extends ErrorBase<"INVALID_TITLE"> {
	constructor() {
		super("INVALID_TITLE", "The title is required.", 400);
	}
}
