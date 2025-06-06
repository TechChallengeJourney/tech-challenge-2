import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { fetchUsers } from '../../actions/users';
import { User } from '@bytebank/shared';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const users = await fetchUsers();

    const user = users.find((user: User) => user.email === email);

    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);
      if(passwordMatches) {
        return NextResponse.json(user, { status: 200 });
      } else {
        return NextResponse.json(
          { error: 'Senha incorreta, verifique-a e tente novamente, por favor!' },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'E-mail ou senha incorretos, verifique suas credenciais e tente novamente, por favor!' },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json({ error: 'Ocorreu um erro, tente novamente mais tarde por favor!' }, { status: 500 });
  }
}
