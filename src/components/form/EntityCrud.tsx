import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { CrudModel } from '../../models/crud.model';
import { getOneBase } from '../../services/common';
import { EntityField, FieldType, FormField } from './EntityField';
import { optionsFormatter, retrieveValueOnly } from './fields/BaseSelect';

interface FormProps<T> {
  idName?: string;
  formFields: string[];
  title: string;
  mode?: 'edit' | 'create';
  model: CrudModel<T>;
}

type GenericEntity = {
  [key: string]: any;
};

export function EntityCrud<Entity>({
  idName,
  formFields,
  title,
  model,
  mode = 'create',
}: FormProps<Entity>) {
  const [loading, setLoading] = useState({
    updatingOrCreating: false,
    deleting: false,
  });
  const [entityLoaded, setEntityLoaded] = useState<boolean>(false);
  const [entity, setEntity] = useState<GenericEntity>({} as GenericEntity);
  const [fields, setFields] = useState<FormField[]>([]);
  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const entityId = router.query[idName as string] as string | undefined;

  const onSubmit = async (rawData: any) => {
    // retrieve only the value from select
    const data = retrieveValueOnly<Entity>(rawData);
    setLoading({ ...loading, updatingOrCreating: true });

    try {
      if (isCreateMode) {
        await model.create(data);
        reset();
      } else {
        await model.patch(entityId ?? '', data);
      }

      // redirect to entity table
      router.push(router.pathname.split('/').slice(0, 2).join('/'));
    } catch (err) {
      console.error(err);
    }

    setLoading({ ...loading, updatingOrCreating: false });
  };

  const deleteOne = useCallback(async () => {
    setLoading({ ...loading, deleting: true });

    try {
      await model.delete(entityId ?? '');
      router.push(router.pathname.split('/').slice(0, 2).join('/'));
    } catch (err) {
      console.error(err);
    }

    setLoading({ ...loading, deleting: false });
  }, [entityId, router, loading, model]);

  useEffect(() => {
    const isEditMode = mode === 'edit';

    let cancel = false;

    const fetchData = async () => {
      if (cancel) return;

      try {
        if (entityId && isEditMode) {
          const fetchedEntity = (await getOneBase<GenericEntity>({
            resource: model.endpoint,
            id: entityId,
          })) as GenericEntity;

          setEntity(fetchedEntity);
        }

        const entityDescription = await model.entityDescription(true);

        const formattedFields = formFields.reduce<FormField[]>(
          (allFields: FormField[], key) => {
            const description = entityDescription.find(
              (desc) => desc.key === key
            );

            if (description) {
              const {
                placeholder,
                subject: label,
                type,
                rules = {},
                key: name,
                relation,
                selectKey = 'name',
              } = description;

              if (type) {
                const fieldProps = {
                  placeholder: placeholder ?? '',
                  label,
                  type,
                  name,
                  rules,
                };

                if (relation) {
                  const selectOptions =
                    model.relationOptions.find(
                      (relation) => relation.key === key
                    )?.data ?? [];

                  if (!selectKey) {
                    console.warn(
                      'Using default key (name) to generate select values.'
                    );
                  }

                  Object.assign(fieldProps, {
                    selectOptionKey: selectKey,
                    selectOptions: selectOptions
                      ? optionsFormatter(selectOptions, selectKey)
                      : [],
                  });
                }

                allFields.push(fieldProps);
              }
            }

            return allFields;
          },
          []
        );

        setFields([...formattedFields]);
        setEntityLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, [entityId, mode, model, formFields]);

  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';

  const isEntityOptionsLoaded = () => {
    const selectFields = fields.filter((field) =>
      (['multi-select', 'select'] as FieldType[]).includes(field.type)
    );

    return selectFields.every((field) => {
      if (!field.selectOptionKey) {
        throw new Error(`Key is required at select "${field.label}".`);
      }

      return field.selectOptionKey && entity[field.name];
    });
  };

  return (
    <>
      {entityLoaded &&
        (isCreateMode || (isEditMode && isEntityOptionsLoaded())) && (
          <Flex
            p="2rem"
            maxW={{ base: '70%', md: '600px' }}
            minH="100%"
            mx="auto"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Box w="100%">
              <Heading alignSelf="flex-start" mb="1rem">
                {mode === 'edit' ? 'Editar' : 'Criar'} {title}.
              </Heading>
              <Box
                w="100%"
                as="form"
                bg="gray.800"
                boxShadow="xl"
                borderRadius="0.5rem"
                p="2rem"
                onSubmit={handleSubmit(onSubmit)}
              >
                {fields.map((field) => (
                  <EntityField
                    field={field}
                    setValue={setValue}
                    entity={entity}
                    register={register}
                    errors={errors}
                    isEditMode={isEditMode}
                    control={control}
                    key={'field-' + field.name}
                  />
                ))}
                <Flex gridGap={'10px'}>
                  {mode === 'edit' ? (
                    <>
                      <Button
                        onClick={() => deleteOne()}
                        bg="red.800"
                        w="100%"
                        mt={4}
                        isLoading={loading.deleting}
                        _hover={{
                          bg: 'red.700',
                        }}
                      >
                        Deletar
                      </Button>

                      <Button
                        bg="green.700"
                        w="100%"
                        mt={4}
                        isLoading={loading.updatingOrCreating}
                        type="submit"
                        _hover={{
                          bg: 'green.600',
                        }}
                      >
                        Atualizar
                      </Button>
                    </>
                  ) : (
                    <Button
                      bg="blue.800"
                      w="100%"
                      mt={4}
                      isLoading={loading.updatingOrCreating}
                      type="submit"
                      _hover={{
                        bg: 'blue.700',
                      }}
                    >
                      Criar
                    </Button>
                  )}
                </Flex>
              </Box>
            </Box>
          </Flex>
        )}
    </>
  );
}
