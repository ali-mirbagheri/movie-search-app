/**
 * Utility function for transforming data from one object structure to another.
 */

/**
 * Transforms input data into the desired output structure using a mapping configuration
 * @param input - The input object to transform
 * @param mapper - Optional mapping configuration where keys are output properties and values are input keys or transformation functions
 * @returns The transformed output object
 * @template TInput - Type of the input object
 * @template TOutput - Type of the output object
 */
export const transformData = <TInput extends object, TOutput extends object>(
  input: TInput,
  mapper?: {
    [K in keyof TOutput]?: keyof TInput | ((input: TInput) => TOutput[K]);
  }
): TOutput => {
  const output: Partial<TOutput> = {};

  // Auto-map properties with matching names
  const inputKeys = Object.keys(input) as Array<keyof TInput>;
  const outputKeys = mapper ? (Object.keys(mapper) as Array<keyof TOutput>) : [];

  inputKeys.forEach((inputKey) => {
    if (outputKeys.includes(inputKey as unknown as keyof TOutput)) {
      return; // Skip if handled by custom mapper
    }
    
    if (inputKey in output) {
      output[inputKey as unknown as keyof TOutput] = 
        input[inputKey] as unknown as TOutput[keyof TOutput];
    }
  });

  // Apply custom mapping if provided
  if (mapper) {
    outputKeys.forEach((outputKey) => {
      const inputKeyOrFn = mapper[outputKey];
      if (typeof inputKeyOrFn === 'function') {
        output[outputKey] = inputKeyOrFn(input);
      } else if (inputKeyOrFn !== undefined) {
        output[outputKey] = 
          input[inputKeyOrFn as keyof TInput] as unknown as TOutput[keyof TOutput];
      }
    });
  }

  return output as TOutput;
};